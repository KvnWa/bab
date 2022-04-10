class CreateChatroomMemberships < ActiveRecord::Migration[6.1]
  def change
    create_table :chatroom_memberships do |t|
      t.belongs_to :chatroom, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
