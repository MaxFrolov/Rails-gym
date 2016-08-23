class Category < ActiveRecord::Base
  TARGETS = %w(Post Food Workout)

  belongs_to :target, polymorphic: true, inverse_of: :categories, counter_cache: true
end
