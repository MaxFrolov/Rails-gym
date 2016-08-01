class ListOfExercise < ActiveRecord::Base
  has_many :training_diaries
  has_many :user_training_exercises

  enum level: { beginner: 0, intermediate: 1, advanced: 2 }
end
