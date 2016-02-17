class OrderItem < ActiveRecord::Base
  belongs_to :product
  belongs_to :order


  attr_accessor :items



  private


end
