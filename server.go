package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Структура для входящего сообщения
type Message struct {
    ID      string `json:"id"`      // Уникальный ID сообщения
    Type    string `json:"type"`    // Тип сообщения ("yours" или "theirs")
    Text    string `json:"text"`    // Текст сообщения
    Time    string `json:"time"`    // Время отправки
    ReplyTo string `json:"replyTo"` // ID сообщения, на которое отвечает (опционально)
}

func main() {
    // Обработчик для получения сообщений
    http.HandleFunc("/send", func(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodPost {
            http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
            return
        }

        // Декодируем JSON из тела запроса
        var msg Message
        err := json.NewDecoder(r.Body).Decode(&msg)
        if err != nil {
            http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
            return
        }

        // Логируем полученное сообщение
        log.Printf("Received message: %+v\n", msg)

        // Отправляем ответ клиенту
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]string{"status": "success"})
    })

    // Запускаем сервер на порту 8080
    fmt.Println("Server is running on port 8080...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}