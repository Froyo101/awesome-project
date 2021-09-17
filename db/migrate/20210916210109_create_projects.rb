class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :owner
      t.jsonb :content

      t.timestamps
    end
  end
end
