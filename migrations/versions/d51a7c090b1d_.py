"""empty message

Revision ID: d51a7c090b1d
Revises: 765fe16d7d9e
Create Date: 2023-06-11 23:21:57.015281

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'd51a7c090b1d'
down_revision = '765fe16d7d9e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shift')
    with op.batch_alter_table('bid', schema=None) as batch_op:
        batch_op.drop_constraint('bid_shift_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'shifts', ['shift_id'], ['id'])

    with op.batch_alter_table('preferences', schema=None) as batch_op:
        batch_op.drop_column('rank')

    with op.batch_alter_table('shifts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('start_time', sa.DateTime(), nullable=False))
        batch_op.add_column(sa.Column('end_time', sa.DateTime(), nullable=False))
        batch_op.add_column(sa.Column('team_lead', sa.String(length=64), nullable=True))
        batch_op.add_column(sa.Column('manager', sa.String(length=64), nullable=True))
        batch_op.drop_constraint('shifts_shift_time_key', type_='unique')
        batch_op.drop_column('shift_time')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('shifts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('shift_time', sa.VARCHAR(length=64), autoincrement=False, nullable=True))
        batch_op.create_unique_constraint('shifts_shift_time_key', ['shift_time'])
        batch_op.drop_column('manager')
        batch_op.drop_column('team_lead')
        batch_op.drop_column('end_time')
        batch_op.drop_column('start_time')

    with op.batch_alter_table('preferences', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rank', sa.INTEGER(), autoincrement=False, nullable=True))

    with op.batch_alter_table('bid', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('bid_shift_id_fkey', 'shift', ['shift_id'], ['id'])

    op.create_table('shift',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('start_time', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('end_time', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='shift_pkey')
    )
    # ### end Alembic commands ###
