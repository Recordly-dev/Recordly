FROM python:3.8-slim
COPY . /app
WORKDIR /app
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y make automake gcc g++ subversion python3-dev
# No JVM shared library file (libjvm.so) found. Try setting up the JAVA_HOME environment variable properly. 에러 발생 시 사용 필요
RUN apt-get install -y default-jdk
RUN /usr/local/bin/python -m pip install --upgrade pip

RUN pip3 install flask
RUN pip3 install sklearn
RUN pip3 install sentence_transformers
RUN pip3 install konlpy

RUN chmod +x /app/app.py
CMD ["python3", "app.py"]
