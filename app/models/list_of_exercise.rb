class ListOfExercise < ActiveRecord::Base
  has_many :training_diaries
  has_many :user_training_exercises

  enum level: { beginner: 0, intermediate: 1, advanced: 2 }
  enum measuring: { weight: 0, time: 1, blank: 2 }
end
