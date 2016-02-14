class OrderedUser < ActiveRecord::Base
  has_many :orders, inverse_of: :ordered_user
end
