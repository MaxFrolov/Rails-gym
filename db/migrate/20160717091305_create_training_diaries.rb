class CreateTrainingDiaries < ActiveRecord::Migration
  def change
    create_table :training_diaries do |t|
      t.integer :exercise
      t.integer :sets
      t.timestamp :date
      t.references :user
      t.timestamps null: false
    end
  end
end
