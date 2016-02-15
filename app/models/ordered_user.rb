class OrderedUser < ActiveRecord::Base
  belongs_to :order, inverse_of: :ordered_user
end
