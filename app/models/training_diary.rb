class TrainingDiary < ActiveRecord::Base
  belongs_to :user
  has_many :training_diary_exercises

  accepts_nested_attributes_for :training_diary_exercises, allow_destroy: true

  enum exercise: { bench_press: 0, bench_press_on_an_incline_bench: 1 }
end
