var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var users = new List<ExternalUser>
{
    new("ext-usr-001", "ext.manuela", "Manuela External", "manuela.external@test.local", "Ext@1234", true),
    new("ext-usr-002", "ext.ricardo", "Ricardo External", "ricardo.external@test.local", "Ext@1234", true)
};

app.MapGet("/health", () => Results.Ok(new
{
    status = "ok",
    source = "AdhocReport.ExternalAuth.DotNetExample"
}));

app.MapPost("/api/external-auth/validate", (ExternalAuthValidateRequest request) =>
{
    var username = request.Username?.Trim() ?? string.Empty;
    var externalUserId = request.ExternalUserId?.Trim() ?? string.Empty;
    var password = request.Password ?? string.Empty;

    if (string.IsNullOrWhiteSpace(password) || (string.IsNullOrWhiteSpace(username) && string.IsNullOrWhiteSpace(externalUserId)))
    {
        return Results.BadRequest(new
        {
            isAuthenticated = false,
            message = "invalid-request"
        });
    }

    var user = !string.IsNullOrWhiteSpace(externalUserId)
        ? users.FirstOrDefault(u => u.UserId.Equals(externalUserId, StringComparison.OrdinalIgnoreCase))
        : users.FirstOrDefault(u => u.Username.Equals(username, StringComparison.OrdinalIgnoreCase));

    if (user is null || !user.IsActive)
    {
        return Results.Ok(new
        {
            isAuthenticated = false,
            message = "invalid-credentials"
        });
    }

    if (!string.Equals(user.Password, password, StringComparison.Ordinal))
    {
        return Results.Ok(new
        {
            isAuthenticated = false,
            message = "invalid-credentials"
        });
    }

    if (string.IsNullOrWhiteSpace(user.Email))
    {
        return Results.Ok(new
        {
            isAuthenticated = false,
            message = "invalid-user-email"
        });
    }

    return Results.Ok(new
    {
        isAuthenticated = true,
        userContext = new
        {
            userId = user.UserId
        },
        fullName = user.FullName,
        email = user.Email
    });
});

app.Run("https://localhost:5199");

internal sealed record ExternalAuthValidateRequest(string? Username, string? Password, string? ExternalUserId);
internal sealed record ExternalUser(string UserId, string Username, string FullName, string Email, string Password, bool IsActive);
