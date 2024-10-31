"""some changes

Revision ID: 9422cb444770
Revises: ec15c61a3d39
Create Date: 2024-10-31 14:10:05.948478

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9422cb444770'
down_revision: Union[str, None] = 'ec15c61a3d39'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_classes_id', table_name='classes')
    op.drop_table('classes')
    op.drop_index('ix_answers_id', table_name='answers')
    op.drop_table('answers')
    op.drop_table('user_classes')
    op.drop_index('ix_users_id', table_name='users')
    op.drop_table('users')
    op.drop_index('ix_questions_id', table_name='questions')
    op.drop_table('questions')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('questions',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('questions_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('title', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('content', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('class_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('is_answered', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], name='questions_class_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='questions_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='questions_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_index('ix_questions_id', 'questions', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('users_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('hashed_password', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='users_pkey'),
    sa.UniqueConstraint('email', name='users_email_key'),
    sa.UniqueConstraint('username', name='users_username_key'),
    postgresql_ignore_search_path=False
    )
    op.create_index('ix_users_id', 'users', ['id'], unique=False)
    op.create_table('user_classes',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('class_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], name='user_classes_class_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='user_classes_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', 'class_id', name='user_classes_pkey')
    )
    op.create_table('answers',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('content', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('question_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], name='answers_question_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='answers_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='answers_pkey')
    )
    op.create_index('ix_answers_id', 'answers', ['id'], unique=False)
    op.create_table('classes',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='classes_pkey')
    )
    op.create_index('ix_classes_id', 'classes', ['id'], unique=False)
    # ### end Alembic commands ###
