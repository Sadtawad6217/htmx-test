package service

import (
	"gobackend/model"
)

func (s *Service) CreatePosts(title, content string, published bool) (model.Posts, error) {
	post := model.New(
		title,
		content,
		published,
	)

	return s.repository.CreatePosts(*post)
}
