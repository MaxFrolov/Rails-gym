class TrainingDiary < ActiveRecord::Base
  belongs_to :user
  has_many :training_diary_exercises

  scope :stats_by_period, -> (start_time, end_time) do
    where('date >= ? AND date <= ?', start_time, end_time)
  end

  accepts_nested_attributes_for :training_diary_exercises, allow_destroy: true

  enum exercise: { bench_press: 0, bench_press_on_an_incline_bench: 1 }
end
