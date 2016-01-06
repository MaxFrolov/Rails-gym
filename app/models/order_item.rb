class OrderItem < ActiveRecord::Base
  belongs_to :product
  belongs_to :order
  before_save :finalize

  attr_accessor :items

  def total_price
    unit_price * quantity
  end

  def unit_price
    if persisted?
      self[:unit_price]
    else
      product.price
    end
  end

  private

  def finalize
    self[:unit_price] = unit_price
    self[:total_price] = quantity * self[:unit_price]
  end
end
