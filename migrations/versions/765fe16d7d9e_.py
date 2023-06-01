"""empty message

Revision ID: 765fe16d7d9e
Revises: 0e0b8fefcabf
Create Date: 2023-05-31 19:53:45.478847

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '765fe16d7d9e'
down_revision = '0e0b8fefcabf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('shift',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.DateTime(), nullable=False),
    sa.Column('end_time', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bid',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('shift_id', sa.Integer(), nullable=False),
    sa.Column('bid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['shift_id'], ['shift.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bid')
    op.drop_table('shift')
    # ### end Alembic commands ###