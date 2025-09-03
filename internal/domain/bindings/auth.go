package bindings

import (
	"context"
	"get-started/internal/database"
	"get-started/internal/domain/entities"
	"get-started/internal/domain/models"
	"log"
	"strings"
	"time"
)

type Auth struct {
	ctx context.Context
}

func NewAuth() *Auth { return &Auth{} }

func (a *Auth) Startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *Auth) Login(username, password string) models.LoginResult {
	ok, err := a.MakeAuth(entities.User{
		Username: username,
		Password: password,
	})
	if err != nil {
		log.Printf("[auth] erro: %v", err)
	}
	if ok {
		return models.LoginResult{Ok: true, Message: "Login successful"}
	}
	return models.LoginResult{Ok: false, Message: "Invalid credentials"}
}

func (a *Auth) MakeAuth(user entities.User) (bool, error) {
	u := strings.TrimSpace(user.Username)
	p := user.Password

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	const q = `
		SELECT EXISTS(
			SELECT 1 FROM users
			WHERE username = $1 AND password = $2
		);
	`
	var ok bool
	if err := database.DB.QueryRow(ctx, q, u, p).Scan(&ok); err != nil {
		return false, err
	}
	return ok, nil
}
