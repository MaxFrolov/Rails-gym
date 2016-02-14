class AddOrderToOrderedUsers < ActiveRecord::Migration
  def change
    add_reference :orders, :ordered_user, index: true
  end
end
