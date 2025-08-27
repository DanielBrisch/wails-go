package main

import (
	"context"
	"embed"
	"get-started/internal/database"
	"get-started/internal/domain/bindings"
	"log"

	"github.com/joho/godotenv"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Erro ao carregar o arquivo .env")
	}
	if err := database.ConnectDatabase(); err != nil {
		log.Fatalf("Erro ao conectar ao banco de dados: %v", err)
	}

	app := NewApp()
	auth := bindings.NewAuth()

	err := wails.Run(&options.App{
		Title:  "get-started",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup: func(ctx context.Context) {
			app.startup(ctx)
			auth.Startup(ctx)
		},
		Bind: []any{
			app,
			auth,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
