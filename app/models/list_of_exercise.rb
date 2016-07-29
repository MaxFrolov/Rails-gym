class ListOfExercise < ActiveRecord::Base
  has_many :training_diaries

  enum level: { beginner: 0, intermediate: 1, advanced: 2 }
end
