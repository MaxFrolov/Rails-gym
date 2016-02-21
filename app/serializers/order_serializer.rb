class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_status, :subtotal, :total, :payment_type
  has_one :ordered_user
  has_many :order_items, serializer: OrderedItemSerializer
end
