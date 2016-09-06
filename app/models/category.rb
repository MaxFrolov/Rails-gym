class Category < ActiveRecord::Base
  has_many :items_categories
  has_many :posts, through: :items_categories, source: :target, source_type: 'Post'
  has_many :foods, through: :items_categories, source: :target, source_type: 'Food'
  has_many :workouts, through: :items_categories, source: :target, source_type: 'Workout'

  scope :target_filter, -> (target) do
    where('items_categories.target_type = ?', target.capitalize)
  end
end
