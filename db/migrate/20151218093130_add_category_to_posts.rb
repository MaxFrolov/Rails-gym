class AddCategoryToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :post_category, :integer
  end
end
