package models

type LoginResult struct {
	Ok      bool   `json:"ok"`
	Message string `json:"message"`
}
