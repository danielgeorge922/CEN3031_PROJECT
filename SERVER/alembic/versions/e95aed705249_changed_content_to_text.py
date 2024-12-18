"""changed content to text

Revision ID: e95aed705249
Revises: 70ddb78a0e82
Create Date: 2024-11-27 12:46:24.300822

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e95aed705249'
down_revision: Union[str, None] = '70ddb78a0e82'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('answers', sa.Column('text', sa.String(), nullable=False))
    op.drop_column('answers', 'content')
    op.add_column('questions', sa.Column('text', sa.String(), nullable=False, server_default="N/A"))
    op.drop_column('questions', 'content')
    op.alter_column('questions', 'text', server_default=None)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('questions', sa.Column('content', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_column('questions', 'text')
    op.add_column('answers', sa.Column('content', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_column('answers', 'text')
    # ### end Alembic commands ###
