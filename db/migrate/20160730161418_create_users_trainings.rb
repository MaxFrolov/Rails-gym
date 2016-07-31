class CreateUsersTrainings < ActiveRecord::Migration
  def change
    create_table :users_trainings do |t|
      t.integer :sets
      t.timestamp :date
      t.references :user, index: true
      t.references :list_of_exercise, index: true
      t.timestamps null: false
    end
  end
end
