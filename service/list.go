package service

import (
	"gobackend/model"
)

func (s *Service) GetPostAll(limit, offset int, searchTitle string, published bool) ([]model.Posts, error) {
	return s.repository.GetPostAll(limit, offset, searchTitle, published)
}
