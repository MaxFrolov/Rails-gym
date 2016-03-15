class OrderedUser < ActiveRecord::Base
  belongs_to :order, inverse_of: :ordered_user

  validates_presence_of :email, :phone, :address, :city, :country, :first_name, :last_name
end
