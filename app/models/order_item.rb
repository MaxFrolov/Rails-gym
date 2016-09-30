class OrderItem < ActiveRecord::Base
  belongs_to :product
  belongs_to :order

  before_create :set_unit_price
  before_save :set_total_price

  def set_unit_price
    self.unit_price = product.price
  end

  def set_total_price
    self.total_price = total_price_q
  end

  def total_price_q
    product.price * quantity
  end
end
