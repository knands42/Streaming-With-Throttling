generate-csv:
	echo "id,name,desc,age" > data-integration/big.csv
	for i in `seq 1 5`; do node -e "process.stdout.write('$$i,name-$$i,$$i-text,$$i\\n'.repeat(1e5))" >> data-integration/big.csv; done

start-server:
	cd webapi && npm run start 

start-streaming:
	cd data-integration && npm run start