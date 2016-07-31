class UsersTraining < ActiveRecord::Base
  belongs_to :user
  has_many :list_of_exercises
end
