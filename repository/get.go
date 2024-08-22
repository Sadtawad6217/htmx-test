package repository

import (
	"gobackend/model"
)

func (r *repository) GetPostByID(id string) (model.Posts, error) {
	var post model.Posts
	query := `SELECT * FROM posts WHERE id = $1`
	err := r.db.Get(&post, query, id)
	if err != nil {
		return post, err
	}
	return post, nil
}
