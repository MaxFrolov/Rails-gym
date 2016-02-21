class OrderedItemSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :unit_price, :total_price, :quantity
  has_one :product
end
