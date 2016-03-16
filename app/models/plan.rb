class Plan < ActiveRecord::Base
  validates_presence_of :first_name, :last_name, :email, :phone

  enum plan: { beginner: 0, standart: 1, pro: 2 }
end
