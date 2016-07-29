class TrainingDiary < ActiveRecord::Base
  belongs_to :user
  belongs_to :list_of_exercise
  has_many :training_diary_exercises

  scope :stats_by_period, -> (start_time, end_time) do
    where('date >= ? AND date <= ?', start_time, end_time)
  end

  accepts_nested_attributes_for :training_diary_exercises, allow_destroy: true

end
