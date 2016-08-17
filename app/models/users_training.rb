class UsersTraining < ActiveRecord::Base
  belongs_to :user
  has_many :user_training_exercises

  accepts_nested_attributes_for :user_training_exercises, allow_destroy: true

  before_save :clear_time

  def clear_time
    self.date = Date.parse(date.to_s).to_formatted_s(:iso8601)
  end
end
