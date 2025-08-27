package bindings

import (
	"context"
	"fmt"
	"get-started/internal/database"
	"get-started/internal/domain/entities"
	"get-started/internal/domain/models"

	"github.com/jackc/pgx/v5"
)

type Auth struct {
	ctx context.Context
}

func NewAuth() *Auth { return &Auth{} }

func (a *Auth) Startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *Auth) Login(username, password string) models.LoginResult {
	canAcess, err := a.MakeAuth(entities.User{
		Username: username,
		Password: password,
	})
	if err != nil {
		fmt.Println(err)
	}

	if *canAcess {
		return models.LoginResult{Ok: *canAcess, Message: "Login successful"}
	}
	return models.LoginResult{Ok: *canAcess, Message: "Invalid credentials"}
}

func (a *Auth) MakeAuth(user entities.User) (*bool, error) {
	canAcess := false
	sql := fmt.Sprintf(`select username from users where exists (select 1 from users where username like '%v'`, user.Username)

	rows, err := database.DB.Query(context.Background(), sql)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users, err := pgx.CollectRows(rows, pgx.RowToStructByName[entities.User])
	if err != nil {
		return &canAcess, err
	}
	canAcess = len(users) > 0
	return &canAcess, nil
}
