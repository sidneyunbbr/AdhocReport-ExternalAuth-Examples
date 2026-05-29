package main

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

type ExternalAuthValidateRequest struct {
	Username       string `json:"username"`
	ExternalUserID string `json:"externalUserId"`
	Password       string `json:"password"`
}

type ExternalUser struct {
	UserID   string
	Username string
	FullName string
	Email    string
	Password string
	IsActive bool
}

var users = []ExternalUser{
	{UserID: "ext-usr-001", Username: "ext.manuela", FullName: "Manuela External", Email: "manuela.external@test.local", Password: "Ext@1234", IsActive: true},
	{UserID: "ext-usr-002", Username: "ext.ricardo", FullName: "Ricardo External", Email: "ricardo.external@test.local", Password: "Ext@1234", IsActive: true},
}

func main() {
	app := fiber.New()

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
			"source": "AdhocReport.ExternalAuth.GoFiberExample",
		})
	})

	app.Post("/api/external-auth/validate", func(c *fiber.Ctx) error {
		var req ExternalAuthValidateRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"isAuthenticated": false,
				"message":         "invalid-request",
			})
		}

		username := strings.TrimSpace(req.Username)
		externalUserID := strings.TrimSpace(req.ExternalUserID)
		password := req.Password

		if (username == "" && externalUserID == "") || password == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"isAuthenticated": false,
				"message":         "invalid-request",
			})
		}

		var user *ExternalUser
		for i := range users {
			if externalUserID != "" {
				if users[i].UserID == externalUserID {
					user = &users[i]
					break
				}
			} else if users[i].Username == username {
				user = &users[i]
				break
			}
		}

		if user == nil || !user.IsActive {
			return c.JSON(fiber.Map{
				"isAuthenticated": false,
				"message":         "invalid-credentials",
			})
		}

		if user.Password != password {
			return c.JSON(fiber.Map{
				"isAuthenticated": false,
				"message":         "invalid-credentials",
			})
		}

		if strings.TrimSpace(user.Email) == "" {
			return c.JSON(fiber.Map{
				"isAuthenticated": false,
				"message":         "invalid-user-email",
			})
		}

		return c.JSON(fiber.Map{
			"isAuthenticated": true,
			"userContext": fiber.Map{
				"userId": user.UserID,
			},
			"fullName": user.FullName,
			"email":    user.Email,
		})
	})

	_ = app.Listen("127.0.0.1:5199")
}
