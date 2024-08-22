package model

import (
	"time"
)

type Posts struct {
	ID        string     `db:"id"`
	Title     string     `db:"title"`
	Content   string     `db:"content"`
	Published bool       `db:"published"`
	ViewCount int64      `db:"view_count"`
	CreatedAt time.Time  `db:"created_at"`
	UpdatedAt time.Time  `db:"updated_at"`
	DeletedAt *time.Time `db:"deleted_at"`
}

func New(title, content string, published bool) *Posts {
	return &Posts{
		Title:     title,
		Content:   content,
		Published: published,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}
func (p *Posts) Update(title, content *string, published bool, viewCount *int64) {
	if title != nil {
		p.Title = *title
	}
	if content != nil {
		p.Content = *content
	}
	if published {
		p.Published = true
	}
	if viewCount != nil {
		p.ViewCount = *viewCount
	}
	p.UpdatedAt = time.Now()
}
