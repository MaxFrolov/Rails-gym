class Advice < ActiveRecord::Base
  belongs_to :user
  belongs_to :advice
end
