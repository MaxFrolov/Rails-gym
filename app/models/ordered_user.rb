class OrderedUser < ActiveRecord::Base
  has_many :orders
end
