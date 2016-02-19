class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_status, :subtotal, :total, :payment_type
end
