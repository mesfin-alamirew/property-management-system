import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

async function main() {
  const containerName = process.env.AZURE_STORAGE_CONTAINER;

  if (!containerName) {
    throw new Error('AZURE_STORAGE_CONTAINER is not configured');
  }

  const { azureBlobStorage } =
    await import('../src/lib/storage/azure-blob.storage');

  const testStorageKey = `test/azure-blob-test-${Date.now()}.txt`;
  const testContent = 'PMS Azure Blob Storage test';

  console.log('Azure Blob Storage test started');
  console.log('Container:', containerName);
  console.log('Storage key:', testStorageKey);

  const uploadResult = await azureBlobStorage.upload({
    containerName,
    storageKey: testStorageKey,
    contentType: 'text/plain',
    data: Buffer.from(testContent, 'utf-8'),
  });

  console.log('Upload successful:', uploadResult);

  const downloadResult = await azureBlobStorage.download(
    containerName,
    testStorageKey,
  );

  const downloadedContent = downloadResult.data.toString('utf-8');

  console.log('Download successful:', {
    contentType: downloadResult.contentType,
    content: downloadedContent,
  });

  if (downloadedContent !== testContent) {
    throw new Error('Downloaded content does not match uploaded content');
  }

  console.log('Content verification: PASSED');

  await azureBlobStorage.delete(containerName, testStorageKey);

  console.log('Delete successful');
  console.log('Azure Blob Storage test: PASSED');
}

main().catch((error) => {
  console.error('Azure Blob Storage test: FAILED');
  console.error(error);
  process.exit(1);
});
