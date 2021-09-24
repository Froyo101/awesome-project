class AddCurBucketIdAndCurCardIdToProjects < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :cur_bucket_id, :integer
    add_column :projects, :cur_card_id, :integer
  end
end
