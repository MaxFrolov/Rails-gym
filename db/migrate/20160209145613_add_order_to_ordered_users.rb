class AddOrderToOrderedUsers < ActiveRecord::Migration
  def change
    add_reference :ordered_users, :order, index: true
  end
end
