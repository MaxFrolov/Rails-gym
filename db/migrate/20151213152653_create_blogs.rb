class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :picture_url
      t.string :header
      t.string :short_description
      t.string :news
      t.datetime :news_date
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
