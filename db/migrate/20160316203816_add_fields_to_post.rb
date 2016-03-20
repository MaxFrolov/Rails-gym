class AddFieldsToPost < ActiveRecord::Migration
  def change
    add_column :posts, :type, :string
    add_column :posts, :video_id, :string
    add_column :posts, :service, :integer
    add_column :posts, :link, :string
    add_column :posts, :source, :string
    add_column :posts, :preview_image, :string
  end
end
