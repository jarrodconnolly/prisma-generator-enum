import test from 'node:test';
import assert from 'node:assert/strict';
import { UserRole } from '../enumerations/enumerations.js';

test('UserRole', (t) => {
  assert.equal(UserRole.ADMIN.enumOrdinal, 0);
  assert.equal(UserRole.USER.enumOrdinal, 1);

  assert.equal(UserRole.enumValueOf('ADMIN'), UserRole.ADMIN);
  assert.equal(UserRole.enumValueOf('USER'), UserRole.USER);

  assert.equal(UserRole.ADMIN.toString(), 'UserRole.ADMIN');
  assert.equal(UserRole.USER.toString(), 'UserRole.USER');

  assert.equal(UserRole.ADMIN.label, 'Administrator');
  assert.equal(UserRole.USER.label, 'User');

  assert.equal(UserRole.enumKeys.length, 2);
  assert.deepEqual(UserRole.enumKeys, ['ADMIN', 'USER']);

  assert.equal(UserRole.enumDocs.length, 2);
  assert.deepEqual(UserRole.enumDocs, ['Administrator', 'User']);

  assert.equal(UserRole.enumValues.length, 2);
  assert.equal(UserRole.enumValues[0], UserRole.ADMIN);
  assert.equal(UserRole.enumValues[1], UserRole.USER);

  assert.equal(UserRole.reactSelectOptions().length, 2);
  assert.deepEqual(UserRole.reactSelectOptions(), [
    { value: 'ADMIN', label: 'Administrator' },
    { value: 'USER', label: 'User' },
  ]);
});