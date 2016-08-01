class UsersTraining < ActiveRecord::Base
  belongs_to :user
  has_many :user_training_exercises

  accepts_nested_attributes_for :user_training_exercises, allow_destroy: true

  def label_for_admin
    Date.parse(date.to_s).to_formatted_s(:iso8601)
  end
end
