class UserTrainingPlan < ActiveRecord::Base
  validates_presence_of :first_name, :last_name, :phone, :email, :number_of_weeks

  belongs_to :user
end
