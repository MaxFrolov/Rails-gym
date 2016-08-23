class CreateExercises < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.string :title
      t.string :subtitle
      t.string :description
      t.integer :reps
      t.integer :sets
      t.integer :time
      t.string :type
      t.string :video_id
      t.integer :service
      t.string :link
      t.string :preview_image
      t.string :image
      t.integer :likes_count, default: 0, null: false
      t.integer :comments_count, default: 0, null: false
      t.references :workout, index: true
      t.timestamps null: false
    end
  end
end
